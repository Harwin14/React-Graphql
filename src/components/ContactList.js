// import ContactItem from './ContactItem';
// import { useQuery, useMutation } from '@apollo/client';
// import { Loading, Alert } from './Util';
// import { GET_CONTACTS, DELETE_CONTACT, UPDATE_CONTACT } from '../graphql/gql';

// export default function ContactList() {
//     const {
//         loading: loadingData,
//         error: errorData,
//         data: list,
//     } = useQuery(GET_CONTACTS);

//     const [deleteContact, { data, loading, error }] = useMutation(
//         DELETE_CONTACT,
//         {
//             refetchQueries: [{ query: GET_CONTACTS }],
//         }
//     );
//     console.log(data);

//     const [updateContact, { data: dataEdit, loading: loadingEdit, error: errorEdit }] = useMutation(UPDATE_CONTACT, {
//         refetchQueries: [{ query: GET_CONTACTS }],
//     });
//     console.log(dataEdit);

//     if (loadingData || loadingEdit || loading) return <Loading />;
//     if (errorData) return <Alert message={errorData} />;
//     if (errorEdit) return <Alert message={errorEdit} />;
//     if (error) return <Alert message={error} />;

//     return (
//         <table className='table table-striped'>
//             <thead>
//                 <tr>
//                     <th>Name</th>
//                     <th>Phone</th>
//                     <th>Action</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {list.getContacts.map((item, index) => (
//                     <ContactItem
//                         key={item._id}
//                         props={item}
//                         remove={() =>
//                             deleteContact({ variables: { id: item._id } })
//                         }
//                         update={() =>
//                             updateContact({ variables: {id:item._id, name:item.name, phone:item.phone} })
//                         }
//                     />
//                 ))}
//             </tbody>
//         </table>
//     );
// }

import ContactItem from './ContactItem';
import { useQuery } from '@apollo/client';
import { Loading, Alert } from './Util';
import { GET_CONTACTS } from '../graphql/gql';
import { useContext, useState } from 'react';
import { ParamsContext } from './ContactBox';

export default function ContactList() {
    const [contacts, setContacts] = useState([]);
    const { params, setParams } = useContext(ParamsContext);

    const { loading, error } = useQuery(GET_CONTACTS, {
        variables: {
            page: params.page,
            name: params.page,
            phone: params.phone,
        },
        notifyOnNetworkStatusChange: true,
        onCompleted: ({ load: { data } }) => {
            setParams({
                page: data.params.page,
                totalPages: data.params.totalPages,
                name: data.params.name ? data.params.name : params.name,
                phone: data.params.phone ? data.params.phone : params.phone,
            });
            setContacts([
                ...(params.page === 1 ? [] : contacts),
                ...data.contacts,
            ]);
        },
    });
    const scrolling = (event) => {
        if (
            event.target.scrollHeight - event.target.scrollTop ===
            event.target.clientHeight
        ) {
            if (params.page < params.totalPages) {
                setParams({
                    ...params,
                    page: params.page + 1,
                });
            }
        }
    };
    if (loading) return <Loading />;
    if (error) return <Alert messege={error} />;
    return (
        <div onScroll={scrolling} style={{ overflow: 'scroll', height: 300 }}>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((item) => (
                        <ContactItem key={item._id} contacts={item} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
