const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'play',
    description: 'Reproducir música por categoría',
    options: [
      {
        name: 'categoria',
        description: 'Elige tipo de música',
        type: 3,
        required: true,
        choices: [
          { name: 'Épica', value: 'epica' },
          { name: 'Electrónica', value: 'electronica' },
          { name: 'Nightcore', value: 'nightcore' },
          { name: 'LoFi', value: 'lofi' },
          { name: 'Chill', value: 'chill' }
        ]
      }
    ]
  },
  {
    name: 'stop',
    description: 'Detener música'
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands("TU_CLIENT_ID"),
      { body: commands }
    );
    console.log("✅ Comandos actualizados");
  } catch (error) {
    console.error(error);
  }
})();
