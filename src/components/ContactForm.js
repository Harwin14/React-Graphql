import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Loading, Alert } from './Util';
import { GET_CONTACTS, CREATE_CONTACT } from '../graphql/gql';

export default function Contactform() {
    const [createContact, { data, loading, error }] = useMutation(
        CREATE_CONTACT,
        {
            refetchQueries: [{ query: GET_CONTACTS }],
        }
    );
    console.log(data);

    const [contact, setContact] = useState({
        name: '',
        phone: '',
    });

    if (loading) return <Loading />;
    if (error) return <Alert message={error} />;

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                createContact({ variables: contact });
                setContact({ name: '', phone: '' });
            }}
        >
            <div className='row mb-3'>
                <label htmlFor='name' className='col-sm-2 col-form-label'>
                    Name
                </label>
                <div className='col-sm-10'>
                    <input
                        type='text'
                        className='form-control'
                        id='name'
                        value={contact.name}
                        onChange={(e) =>
                            setContact({ ...contact, name: e.target.value })
                        }
                    />
                </div>
            </div>
            <div className='row mb-3'>
                <label htmlFor='phone' className='col-sm-2 col-form-label'>
                    Phone
                </label>
                <div className='col-sm-10'>
                    <input
                        type='text'
                        className='form-control'
                        id='phone'
                        value={contact.phone}
                        onChange={(e) =>
                            setContact({ ...contact, phone: e.target.value })
                        }
                    />
                </div>
            </div>
            <button type='submit' className='btn btn-primary'>
                Save
            </button>
        </form>
    );
}
