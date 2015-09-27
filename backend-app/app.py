from __future__ import absolute_import

import json
import os
from flask import Flask, render_template, request, redirect, session
from flask_sslify import SSLify
import requests

import logging

app = Flask(__name__, static_folder='static', static_url_path='')
app.requests_session = requests.Session()
app.secret_key = os.urandom(24)

sslify = SSLify(app)

logging.basicConfig(
    format="%(levelname)s: %(asctime)s %(message)s",
    filename="debug.log",
    level=logging.DEBUG,
)

counter = 100

with open('config.json') as f:
    config = json.load(f)

def generate_ride_headers(token):
    return {
        'Authorization': 'bearer %s' % token,
        'Content-Type': 'application/json',
    }


@app.route('/health', methods=['GET'])
def health():
    return ';-)'


@app.route('/', methods=['GET'])
def signup():
    url = "http://sandbox-t.olacabs.com/oauth2/authorize?response_type=token&client_id=YTliMWNlYTUtYmRmYy00OTA1LWE1Y2YtMjdiMjljNGY4OTZj&redirect_uri=http://localhost/team56&scope=profile%20booking&state=state123"
    return redirect(url)


@app.route('/team56', methods=['GET'])
def submit():
    return render_template('debug.html')

@app.route('/book', methods=['GET'])
def book():
    url = "http://sandbox-t.olacabs.com/v1/bookings/create"
    logging.info(session.get('access_token'))
    params = {
        'pickup_lat': request.args['myLat'],
        'pickup_lng': request.args['myLong'],
        'pickup_mode':"NOW",
        'category': request.args['category']
    }
    headers={
        'X-APP-TOKEN': config.get('x_app_token'),
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % session.get('access_token'),
    }
    response = app.requests_session.get(
        url,
        headers=headers,
        params=params,
    )
    return response.text

@app.route('/cancel', methods=['GET'])
def cancel():
    url = "http://sandbox-t.olacabs.com/v1/bookings/cancel"
    params = {
        'crn': request.args['crn']
    }
    headers={
        'X-APP-TOKEN': config.get('x_app_token'),
        'Authorization': 'Bearer %s' % session.get('access_token')
    }
    response = app.requests_session.get(
        url,
        headers=headers,
        params=params,
    )
    return response.text

@app.route('/track', methods=['GET'])
def track():
    url = "http://sandbox-t.olacabs.com/v1/bookings/track_ride"

    headers={
        'X-APP-TOKEN': config.get('x_app_token'),
        'Authorization': 'Bearer %s' % session.get('access_token')
    }
    response = app.requests_session.get(
        url,
        headers=headers
    )
    return response.text

@app.route('/map', methods=['GET'])
def map():
    url = "http://sandbox-t.olacabs.com/v1/bookings/track_ride"

    headers={
        'X-APP-TOKEN': config.get('x_app_token'),
        'Authorization': 'Bearer %s' % session.get('access_token')
    }
    response = app.requests_session.get(
        url,
        headers=headers
    )
    response_json=response.json()
    lat=response_json.get('driver_lat')
    long=response_json.get('driver_lng')
    logging.info(str(lat) + "," + str(long))

    return render_template(
        'map.html',
        lat=lat,
        long=long
    )

@app.route('/is_logged_in', methods=['GET'])
def logged_in():
    if 'access_token' not in session:
        return "false"
    else:
        return "true"

@app.route('/save_token', methods=['POST'])
def save_token():
    post_json=request.get_json(force=True)
    logging.info("in save token, token : "+ post_json['token'])
    session['access_token'] =post_json['token']
    logging.info("after assigning to sesion, token :"+session.get('access_token'))
    return "successful"

@app.route('/products', methods=['POST'])
def products():

    post_json=request.get_json(force=True)
    category=request.args['category']
    url = config.get('base_ola_url') + 'products'
    params = {
        'pickup_lat': post_json['start_latitude'],
        'pickup_lng': post_json['start_longitude'],
        'drop_lat': post_json['end_latitude'],
        'drop_lng': post_json['end_longitude'],
        'category': category
    }

    response = app.requests_session.get(
        url,
        headers=generate_ola_headers(),
        params=params,
    )

    if response.status_code != 200:
        return 'There was an error', response.status_code
    return response.text;

@app.route('/access_token', methods=['GET'])
def access_token():
    return session.get('access_token')

def generate_ola_headers():
    return {
        'X-APP-TOKEN': config.get('x_app_token'),
        'Content-Type': 'application/json',
    }

if __name__ == '__main__':
    app.debug = os.environ.get('FLASK_DEBUG', True)
    app.run(port=80)
