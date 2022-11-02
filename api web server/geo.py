import urllib.request
import urllib.parse
import json
import math

with open("secret") as f:
    key = f.read()

def geoCode(address):
    print("\033[93m!! calling api\x1b[0m")
    address = urllib.parse.quote(address)    
    request = f"https://maps.googleapis.com/maps/api/geocode/json?address={address},+CA&key={key}"

    contents = urllib.request.urlopen(request)
    contents = json.load(contents)
    lat, lng = contents["results"][0]["geometry"]["location"].values()
    return lat, lng


def haverSineDistance(thisLong,thisLat, otherLong, otherLat):
    r = 6378100
    φthis,φother = radians(thisLat), radians(otherLat)
    Δφ = radians(otherLat-thisLat)
    Δλ = radians(otherLong - thisLong)

    a = math.sin(Δφ/2) * math.sin(Δφ/2) + math.cos(φthis) * math.cos(φother) *math.sin(Δλ/2) * math.sin(Δλ/2);
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a));

    return r*c

def radians(degree):
    return degree* (math.pi/180)
