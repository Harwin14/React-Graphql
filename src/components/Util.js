export const Loading = () => {
    <div className='spinner-border' role='status'>
        <span className='visually-hidden'>Loading...</span>
    </div>;
};
export const Alert = ({ message }) => {
    <div className='alert alert-danger' role='alert'>
        `Error! ${message}`
    </div>;
};
