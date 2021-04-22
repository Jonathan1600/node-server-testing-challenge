
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('elements').del()
    .then(function () {
      // Inserts seed entries
      return knex('elements').insert([
        { name: 'Hydrogen', symbol: "H", periodic_number: 1 },
        { name: 'Helium', symbol: "He", periodic_number: 2 },
        { name: 'Lithium', symbol: "Li", periodic_number: 3 },
        { name: 'Berilium', symbol: "Be", periodic_number: 4 },
        { name: 'Boron', symbol: "B", periodic_number: 5 },
        { name: 'Carbon', symbol: "C", periodic_number: 6 },
        { name: 'Nitrogen', symbol: "N", periodic_number: 7 },
        { name: 'Oxygen', symbol: "O", periodic_number: 8 }
      ]);
    });
};
