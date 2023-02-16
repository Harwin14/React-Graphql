import { useState } from 'react';

export default function ContactItem({ props, remove, update }) {
    console.log('ini props', props);
    const [isEdit, setEdit] = useState(false);
    const handleForm = () => {
        setEdit({
            isEdit: true,
        });
    };
    const handleCancel = () => {
        setEdit({
            isEdit: false,
        });
    };
    const handleUpdateContact = (e) => {
        console.log(e.target.value);
    };
    // handleInputChange = (event) => {
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;

    //     this.setState({
    //         [name]: value
    //     });
    // }
    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setContact({
    //         ...contact,
    //         [name]: value,
    //     });
    // };
    const [contact, setContact] = useState({
        _id: props._id,
        name: props.name,
        phone: props.phone,
    });

    // console.log(e);
    // }
    if (isEdit) {
        return (
            <tr>
                <td>
                    <input
                        className='form-control'
                        type='text'
                        name='name'
                        id='name'
                        value={props.name}
                        placeholder='Input Name'
                        onChange={(e) =>
                            setContact({ ...contact, name: e.target.value })
                        }
                    />
                </td>
                <td>
                    <input
                        className='form-control'
                        type='text'
                        name='phone'
                        id='phone'
                        value={props.phone}
                        placeholder='Input Phone Number'
                        onChange={(e) =>
                            setContact({ ...contact, name: e.target.value })
                        }
                    />
                </td>
                <td>
                    <button
                        className='btn btn-info'
                        type='button'
                        onClick={handleUpdateContact}
                    >
                        Save
                    </button>
                </td>
                <td>
                    <button
                        className='btn btn-warning'
                        type='button'
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </td>
            </tr>
        );
    } else {
        return (
            <tr>
                <td>{props.name}</td>
                <td>{props.phone}</td>
                <td>
                    <button
                        className='btn btn-success'
                        type='button'
                        onClick={handleForm}
                    >
                        edit
                    </button>
                </td>
                <td>
                    <button
                        className='btn btn-danger'  
                        type='button' 
                        onClick={remove}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}
