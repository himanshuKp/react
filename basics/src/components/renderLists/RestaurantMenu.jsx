export default function RestaurantMenu() {
    const menu = [
    {
      id: 1,
      category: "Starters",
      items: [
        { dishId: "s1", name: "Paneer Tikka", price: 250 },
        { dishId: "s2", name: "Samosa", price: 50 }
      ]
    },
    {
      id: 2,
      category: "Mains",
      items: [
        { dishId: "m1", name: "Dal Makhani", price: 300 },
        { dishId: "m2", name: "Veg Biryani", price: 350 }
      ]
    }
  ];

  return (
    <div>
        <h2>Menu</h2>
        {menu.map(section => (
            <div key={section.id}>
                <h3>{section.category}</h3>
                <ul>
                    {section.items.map(dish => (
                        <li key={dish.dishId}>
                            {dish.name} - ${dish.price}
                        </li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
  )
}