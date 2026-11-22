import EmployeeCart from "./EmployeeCart";

export default function TeamRoster() {
    const team = [
    { id: 101, name: "Amit Patel", role: "Frontend Developer" },
    { id: 102, name: "Priya Sharma", role: "UI Designer" },
    { id: 103, name: "Rahul Singh", role: "Product Manager" }
  ];

  return (
    <div>
        <h3>Core Team</h3>
        {team.map(member => (
            <EmployeeCart
                key={member.id}
                name={member.name}
                role={member.role}
            />
        ))}
    </div>
  )
}