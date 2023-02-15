import Contactform from "./ContactForm";
import ContactList from "./ContactList";

export default function ContactBox() {
    return (
        <div className='card'>
            <div className='card-header'>
                <h1>React-Graphql Phonebook</h1>
            </div>
            <div className='card-body'>
                <Contactform />
            </div>
            <ContactList />
            <div className='card-footer'></div>
        </div>
    );
}
