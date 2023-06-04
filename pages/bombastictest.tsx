import React, { useCallback, useEffect, useReducer, useState, } from 'react';
import { Environment, Client } from 'square';

const accessToken = "EAAAEDJYkyxw6jAYZDDIB2lSN9OuqANI2sZXXIBr1kg2WQxxqKi3hvaIoPHauv8a";

let environment = Environment.Sandbox;
const client = new Client({
    accessToken,
    environment,
})

const formReducer = (state: any, event: any) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

const BombasticTest = () => {
    const [formData, setFormData] = useReducer(formReducer, {});



    const handleSubmit = useCallback(async (e: any) => {        
        e.preventDefault()
        try {
            console.log("HELLO")
            console.log(JSON.stringify(formData))
            const response = await fetch('/api/square/catalogwrite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to Create Catalog Item');
            }

            const data = await response.json();
            console.log(data.catalogItem);
        } catch (error) {
            console.error(error);
        }

    }, [formData])



    const handleChange = (event: any) => {
        setFormData({
            name: event.target.name,
            value: event.target.value
        })
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input type="text" id="displayName" name="displayName" placeholder="Name" onChange={handleChange} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>
            <input id="price" name="price" placeholder="Price" onChange={handleChange} className="h-[55px] w-[330px] lg:h-[50px] border border-black rounded italic pl-4 mt-8 lg:mt-4"/>

            <button className="h-[55px] w-[330px] lg:h-[50px] bg-[#ed7bbe] text-white rounded mt-8 lg:mt-4" type="submit">Submit</button>
        
        </form>
    );
}

export default BombasticTest;