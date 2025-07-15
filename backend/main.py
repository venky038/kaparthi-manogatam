# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this later to your domain
    allow_methods=["*"],
    allow_headers=["*"],
)

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
CHANNEL_ID = os.getenv("CHANNEL_ID")
SHORTS_PLAYLIST_ID = os.getenv("SHORTS_PLAYLIST_ID")

@app.get("/")
def root():
    return {"message": "Kaparthi Manogatam backend is running."}


@app.get("/videos")
def get_latest_videos():
    url = f"https://www.googleapis.com/youtube/v3/search?key={YOUTUBE_API_KEY}&channelId={CHANNEL_ID}&part=snippet,id&order=date&maxResults=50"
    res = requests.get(url)
    return res.json()

@app.get("/shorts")
def get_shorts():
    url = f"https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId={SHORTS_PLAYLIST_ID}&maxResults=20&key={YOUTUBE_API_KEY}"
    res = requests.get(url)
    return res.json()
