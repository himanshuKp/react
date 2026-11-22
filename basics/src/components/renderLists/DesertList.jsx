export default function DesertList() {
  const desserts = [
    {
      title: "Chocolate Cake",
      description: "Chocolate cake is a cake flavored with melted chocolate",
      calories: 500,
    },
  ];

  const newDesserts = desserts.map((dessert, index) => {
    return {
      ...dessert,
      title: dessert.title.toUpperCase(),
      kCal: dessert.calories * 4.184,
    };
  });

  return (
    <div>
      <h3>Dessert List</h3>
      {newDesserts.map((dessert, index) => (
        <div
          key={index}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          <h4>{dessert.title}</h4>
          <p>{dessert.description}</p>
          <p>Calories: {dessert.calories}</p>
          <p>Calories in kCal: {dessert.kCal.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
