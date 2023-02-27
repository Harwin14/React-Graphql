import { useState, useContext } from 'react';
import { ParamsContext } from './ContactBox';

export default function Contactform(props) {
    const { params, setParams } = useContext(ParamsContext);
    const [contact, setContact] = useState({
        name: '',
        phone: '',
    });

    const handleReset = () => {
        setContact({
            name: '',
            phone: '',
        });
        setParams({
            page: 1,
            totalPages: 1,
            name: '',
            phone: '',
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setContact({
            ...contact,
            [name]: value,
        });
    };

    const handleSearchContact = (event) => {
        event.preventDefault();
        if (contact.name === '' && contact.phone === '') {
            return event.preventDefault();
        }
        setParams({
            ...params,
            page: 1,
            name: contact.name,
            phone: contact.phone,
        });
    };
    return (
        <div className='card mx-4'>
            <div className='card-header'>
                <h3>Form Search</h3>
            </div>
            <div className='card-body'>
                <form onSubmit={handleSearchContact}>
                    <div className='row mb-3'>
                        <label
                            htmlFor='name'
                            className='col-sm-2 col-form-label'
                        >
                            Name
                        </label>
                        <div className='col-sm-10'>
                            <input
                                type='text'
                                className='form-control'
                                id='name'
                                name='name'
                                value={contact.name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <label
                            htmlFor='phone'
                            className='col-sm-2 col-form-label'
                        >
                            Phone
                        </label>
                        <div className='col-sm-10'>
                            <input
                                type='text'
                                className='form-control'
                                id='phone'
                                name='phone'
                                value={contact.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button type='submit' className='btn btn-primary'>
                        Search
                    </button>
                    <button
                        type='button'
                        className='btn btn-waning'
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </form>
            </div>
        </div>
    );
}
