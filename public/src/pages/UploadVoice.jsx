import React, { useEffect, useState } from "react";
import { FormContainer } from "./Login";
import {useReactMediaRecorder} from "react-media-recorder"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setVoiceAdded } from "../utils/APIRoutes";

export const PYTHON_BASE_URL = "https://289d-35-222-18-237.ngrok-free.app"

const UploadVoice = () => {
    const { status,startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({audio: true, askPermissionOnMount: true, blobPropertyBag: {type: "audio/wav"} })
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(undefined);
    const submitVoice = async () => {
        const formData = new FormData();
        console.log(mediaBlobUrl);
        let blob = await fetch(mediaBlobUrl).then(r => r.blob());
        const audioFile = new File([blob], 'voice.wav', { type: 'audio/wav' })
        
        formData.append("file", audioFile)

        const user = JSON.parse(localStorage.getItem("chat-app-current-user"));

        try {
            const response = await axios.post(`${PYTHON_BASE_URL}/upload?username=${user.username}`, formData);
            const response2 = await axios.put(`${setVoiceAdded}/${user._id}`)

            console.log(response.data);

            alert("Voice Uploaded!")
            navigate("/setAvatar");



            
        } catch(err) {
            console.log("ERROR UPLOADING DATA", err);
        }

    }
    return <FormContainer>
        <div className="upload">
          <div className="brand">
            <h1>Upload voice</h1>
          </div>
          <p style={{ textAlign: "center", textTransform: "uppercase", color: "white", fontWeight: "bolder" }}>
            Please speak the following
          </p>
          <p style={{ textAlign: "center", textTransform: "uppercase", color: "white",  fontSize: "14px", width: "500px" }}>
            Amidst the tranquil whispers of the wind, the vibrant hues of the sunset paint the sky with warmth, echoing the serenity that envelops this moment. In the gentle cadence of our shared existence, each word we utter becomes a brushstroke, shaping the canvas of our collective narrative. Let our voices dance like the leaves in the breeze, embracing the symphony of life with every syllable
          </p>
          <p style={{ textAlign: "center", textTransform: "uppercase", color: "white", fontWeight: "bolder" }}>Status: {status}</p>
          <button onClick={startRecording}>Start Recording</button>
          <button onClick={stopRecording}>Stop Recording</button>
          <audio src={mediaBlobUrl} controls/>
          <button onClick={submitVoice}>Upload voice</button>
        </div>
    </FormContainer>
}

export default UploadVoice;