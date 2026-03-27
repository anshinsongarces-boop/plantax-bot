const { Client, GatewayIntentBits } = require('discord.js');
const { 
  joinVoiceChannel, 
  createAudioPlayer, 
  createAudioResource 
} = require('@discordjs/voice');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

const TOKEN = process.env.TOKEN;

let player;

// 🎵 CATEGORÍAS DE MÚSICA (puedes cambiar links)
const musicStreams = {
  epica: "https://stream.laut.fm/epic-music",
  electronica: "https://stream.laut.fm/electronic",
  nightcore: "https://stream.laut.fm/nightcore",
  lofi: "https://stream.laut.fm/lofi",
  chill: "https://stream.laut.fm/chillout"
};

client.once('ready', () => {
  console.log(`🌿 Plantax listo como ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // 🎵 COMANDO PLAY CON CATEGORÍA
  if (interaction.commandName === 'play') {
    const categoria = interaction.options.getString('categoria');

    const canal = interaction.member.voice.channel;
    if (!canal) {
      return interaction.reply("❌ Debes estar en un canal de voz");
    }

    const url = musicStreams[categoria];

    if (!url) {
      return interaction.reply("❌ Categoría no válida");
    }

    const conexion = joinVoiceChannel({
      channelId: canal.id,
      guildId: canal.guild.id,
      adapterCreator: canal.guild.voiceAdapterCreator,
    });

    player = createAudioPlayer();

    const recurso = createAudioResource(url);

    player.play(recurso);
    conexion.subscribe(player);

    interaction.reply(`🎵 Reproduciendo música **${categoria}**`);
  }

  // ⏹ STOP
  if (interaction.commandName === 'stop') {
    if (player) {
      player.stop();
      return interaction.reply("⏹ Música detenida");
    }
    interaction.reply("No hay música sonando");
  }
});

client.login(TOKEN);