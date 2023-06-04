import React, { useCallback, useEffect, useReducer, useState, } from 'react';
import { Environment, Client } from 'square';
import { v4 as uuidv4 } from 'uuid';

const accessToken = "EAAAECXwU7D4wQf5uefqELg334vq5M6R6yxjnVdbgSdylbxbVQu1yeibhsx2Ac1B";

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

    const handleSubmit = useCallback((e: any) => {        
        e.preventDefault()
        const id = uuidv4();
        const catalogWrite = async () => {
            try {
                const response = await client.catalogApi.upsertCatalogObject({
                    idempotencyKey: uuidv4(),
                    object: {
                        type: 'ITEM',
                        id: id,
                        itemData: {
                            name: `${formData.displayName}`,
                            variations: [
                                {
                                    type: 'ITEM_VARIATION',
                                    id: `#${formData.displayName}`,
                                    itemVariationData: {
                                        itemId: id,
                                        pricingType: 'FIXED_PRICING',
                                        priceMoney: {
                                            amount: BigInt(`${formData.price}`),
                                            currency: 'CAD',
                                        }
                                    }
                                }
                            ]
                        }
                    }
                })
            } catch (error) {
                console.log("ERROR!");
            }
        }
        
        catalogWrite();
        console.log(formData);        
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