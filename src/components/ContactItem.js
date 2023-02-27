// import { useState } from 'react';

// export default function ContactItem({ props, remove, update }) {
//     console.log('ini props', props);
//     const [isEdit, setEdit] = useState(false);
//     const handleForm = () => {
//         setEdit({
//             isEdit: true,
//         });
//     };
//     const handleCancel = () => {
//         setEdit({
//             isEdit: false,
//         });
//     };
//     const handleUpdateContact = (e) => {
//         console.log(e.target.value);
//     };
//     // handleInputChange = (event) => {
//     //     const target = event.target;
//     //     const value = target.type === 'checkbox' ? target.checked : target.value;
//     //     const name = target.name;

//     //     this.setState({
//     //         [name]: value
//     //     });
//     // }
//     // const handleInputChange = (event) => {
//     //     const { name, value } = event.target;
//     //     setContact({
//     //         ...contact,
//     //         [name]: value,
//     //     });
//     // };
//     const [contact, setContact] = useState({
//         _id: props._id,
//         name: props.name,
//         phone: props.phone,
//     });

//     // console.log(e);
//     // }
//     if (isEdit) {
//         return (
//             <tr>
//                 <td>
//                     <input
//                         className='form-control'
//                         type='text'
//                         name='name'
//                         id='name'
//                         value={props.name}
//                         placeholder='Input Name'
//                         onChange={(e) =>
//                             setContact({ ...contact, name: e.target.value })
//                         }
//                     />
//                 </td>
//                 <td>
//                     <input
//                         className='form-control'
//                         type='text'
//                         name='phone'
//                         id='phone'
//                         value={props.phone}
//                         placeholder='Input Phone Number'
//                         onChange={(e) =>
//                             setContact({ ...contact, name: e.target.value })
//                         }
//                     />
//                 </td>
//                 <td>
//                     <button
//                         className='btn btn-info'
//                         type='button'
//                         onClick={handleUpdateContact}
//                     >
//                         Save
//                     </button>
//                 </td>
//                 <td>
//                     <button
//                         className='btn btn-warning'
//                         type='button'
//                         onClick={handleCancel}
//                     >
//                         Cancel
//                     </button>
//                 </td>
//             </tr>
//         );
//     } else {
//         return (
//             <tr>
//                 <td>{props.name}</td>
//                 <td>{props.phone}</td>
//                 <td>
//                     <button
//                         className='btn btn-success'
//                         type='button'
//                         onClick={handleForm}
//                     >
//                         edit
//                     </button>
//                 </td>
//                 <td>
//                     <button
//                         className='btn btn-danger'
//                         type='button'
//                         onClick={remove}
//                     >
//                         Delete
//                     </button>
//                 </td>
//             </tr>
//         );
//     }
// }

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_CONTACTS, UPDATE_CONTACT, DELETE_CONTACT } from '../graphql/gql';
import { Loading, Alert } from './Util';

export default function ContactItem(props) {
    const [contact, setContact] = useState({
        _id: props.contacts._id,
        name: props.contacts.name,
        phone: props.contacts.phone,
    });

    const [isEdit, setEdit] = useState(false);
    const handleForm = () => {
        setEdit({
            isEdit: true,
        });
    };
    const handleCancel = () => {
        setContact({
            name: props.contacts.name,
            phone: props.contacts.phone,
        });
        setEdit(false);
    };
    const [updateContact, { loading: loadingEdit, error: errorEdit }] =
        useMutation(UPDATE_CONTACT, {
            refetchQueries: [{ query: GET_CONTACTS }],
            onCompleted: () => {
                setEdit(false);
            },
        });

    const [deleteContact, { loading, error }] = useMutation(DELETE_CONTACT, {
        refetchQueries: [{ query: GET_CONTACTS }],
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setContact({
            ...contact,
            [name]: value,
        });
    };

    const handleUpdateContact = () => {
        const data = {
            _id: contact._id,
            name: contact.name,
            phone: contact.phone,
        };
        updateContact({ variables: data });
    };

    if (loading || loadingEdit) return <Loading />;
    if (error || errorEdit) return <Alert message={error} />;

    if (isEdit) {
        return (
            <tr>
                <td>
                    <input
                        className='form-control'
                        type='text'
                        name='name'
                        id='name'
                        value={contact.name}
                        placeholder='Input Name'
                        onChange={handleInputChange}
                    />
                </td>
                <td>
                    <input
                        className='form-control'
                        type='text'
                        name='phone'
                        id='phone'
                        value={contact.phone}
                        placeholder='Input Phone Number'
                        onChange={handleInputChange}
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
                        onClick={() => {
                            deleteContact({
                                variables: { _id: props.contacts._id },
                            });
                        }}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}
