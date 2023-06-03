import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState, } from 'react';
import {ApiError, Client, Environment} from 'square';

const basePath = `https://connect.squareupsandbox.com`;
let environment = Environment.Sandbox;
const client_id = process.env.SQ_APPLICATION_ID;
const client_secret = process.env.SQ_APPLICATION_SECRET;


const scopes = [
    'ITEMS_READ',
    'MERCHANT_PROFILE_READ',
]

const squareClient = new Client({
    environment,
})

const oauthInstance = squareClient.oAuthApi;

const APITest = () => {
    useEffect(() => {
        const handleRequestToken = async () => {
            const state = String(Date.now());
            const url = `${basePath}/oauth2/authorize?client_id=${process.env.SQ_APPLICATION_ID}&response_type=code&scope=${scopes.join('+')}&state=${state}`;
            
            const content = `
                <div class="wrapper">
                    <a class="btn" href="${url}">
                        <strong>Authorize</strong>
                    </a>
                </div>
            `;

            const contentElement = document.getElementById('content');
            if (contentElement) {
				contentElement.innerHTML = content;
            }
        };
    
        handleRequestToken();
    }, []);

    return (
        <div>
            <h1>REQUEST TOKEN PAGE</h1>
            <div id="content"></div>
        </div>
    );
}

export default APITest;