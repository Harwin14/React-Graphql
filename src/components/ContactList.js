import ContactItem from './ContactItem';
import { useQuery, useMutation } from '@apollo/client';
import { Loading, Alert } from './Util';
import { GET_CONTACTS, DELETE_CONTACT, UPDATE_CONTACT } from '../graphql/gql';

export default function ContactList() {
    const {
        loading: loadingData,
        error: errorData,
        data: list,
    } = useQuery(GET_CONTACTS);

    const [deleteContact, { data, loading, error }] = useMutation(
        DELETE_CONTACT,
        {
            refetchQueries: [{ query: GET_CONTACTS }],
        }
    );
    console.log(data);

    const [updateContact, { data: dataEdit, loading: loadingEdit, error: errorEdit }] = useMutation(UPDATE_CONTACT, {
        refetchQueries: [{ query: GET_CONTACTS }],
    });
    console.log(dataEdit);

    if (loadingData || loadingEdit || loading) return <Loading />;
    if (errorData) return <Alert message={errorData} />;
    if (errorEdit) return <Alert message={errorEdit} />;
    if (error) return <Alert message={error} />;

    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {list.getContacts.map((item, index) => (
                    <ContactItem
                        key={item._id}
                        props={item}
                        remove={() =>
                            deleteContact({ variables: { id: item._id } })
                        }
                        update={() =>
                            updateContact({ variables: {id:item._id, name:item.name, phone:item.phone} })
                        }
                    />
                ))}
            </tbody>
        </table>
    );
}
