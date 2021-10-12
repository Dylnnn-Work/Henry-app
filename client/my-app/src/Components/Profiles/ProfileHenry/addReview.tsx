import React, { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

const ALUMNOLOGUEADO = gql`
    query alumnoLogueado($token: String) {
        alumnoLogueado(token: $token) {
            _id
            name
            picture
            surname
        }
    }
`;

const AGREGARREVIEW = gql`
    mutation agregar($_id: ID, $review: ReviewInput) {
        agregarReview(_id: $_id, review: $review) {
            name
        }
    }
`;
const AddReview = (props: any) => {
    const [agregarReview] = useMutation(AGREGARREVIEW);

    const token = localStorage.getItem('token')?.toString();
    const { data } = useQuery(ALUMNOLOGUEADO, {
        variables: {
            token: token
        }
    });
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const inputReview = (document.getElementById(
            'inputReview'
        ) as HTMLInputElement).value;
        console.log(inputReview);
        console.log(props.id);

        const { alumnoLogueado } = data;
        console.log(alumnoLogueado.name);
        const objReview = {
            _id: alumnoLogueado._id,
            description: inputReview,
            name: alumnoLogueado.name,
            surname: alumnoLogueado.surname,
            picture: alumnoLogueado.picture
        };
        console.log(objReview);
        try {
            agregarReview({
                variables: {
                    _id: props.id,
                    review: objReview
                }
            });
        } catch (error) {
            console.error();
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    className="border py-2 px-3 text-grey-darkest"
                    type="text"
                    placeholder="añadir recomendacion"
                    id="inputReview"
                />
                <button
                    className=" text-blue-800 text-sm font-semibold rounded-lg hover:bg-yellow-100 focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                    type="submit">
                    send
                </button>
            </form>
        </div>
    );
};

export default AddReview;
