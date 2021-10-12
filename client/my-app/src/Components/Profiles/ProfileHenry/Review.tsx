import react from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

const FETCHREVIEWS = gql`
    query reviews($_id: ID) {
        reviewsPorAlumno(_id: $_id) {
            description
            name
            surname
        }
    }
`;

const Review = (props: any) => {
    const { data } = useQuery(FETCHREVIEWS, {
        variables: {
            _id: props.id
        }
    });
    console.log(props.id, data?.reviewsPorAlumno);

    return (
        <div>
            {data?.reviewsPorAlumno?.map((r: any, index: number) => {
                return (
                    <div
                        key={index}
                        className="bg-yellow_henry bg-opacity-50 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <p>{r.name + ' ' + r.surname}</p>
                        <span>{r.description}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default Review;
