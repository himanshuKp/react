export default function EmployeeCart({ name, role }) {
    return (
        <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h4>{name}</h4>
            <p>{role}</p>
        </div>
    )
}