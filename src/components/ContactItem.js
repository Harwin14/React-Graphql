export default function ContactItem({ contact, remove, update }) {
    const [edit, setEdit] = useState(false);
 
    if (edit) {
        return (
            <tr>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
                <td>
                    <button
                        className='btn btn-success'
                        type='button'
                        onClick={update}
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
    } else {
        return (
            <tr>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
                <td>
                    <button
                        className='btn btn-success'
                        type='button'
                        onClick={setEdit()}
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
