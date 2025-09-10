document.getElementById('loadBtn').addEventListener('click', loadTwitchVideo);
document.getElementById('submitBtn').addEventListener('click', submitClip);

function loadTwitchVideo() {
  const urlInput = document.getElementById('twitchUrl').value;
  const parentDomain = window.location.hostname;
  const playerDiv = document.getElementById('twitchPlayer');

  let embedUrl = '';

  if (urlInput.includes('twitch.tv/videos/')) {
    const videoId = urlInput.split('/videos/')[1];
    embedUrl = `https://player.twitch.tv/?video=v${videoId}&parent=${parentDomain}`;
  } else if (urlInput.includes('clips.twitch.tv/')) {
    const clipId = urlInput.split('/').pop();
    embedUrl = `https://clips.twitch.tv/embed?clip=${clipId}&parent=${parentDomain}`;
  } else if (urlInput.includes('twitch.tv/') && !urlInput.includes('/videos/')) {
    const channel = urlInput.split('twitch.tv/')[1].split('/')[0];
    embedUrl = `https://player.twitch.tv/?channel=${channel}&parent=${parentDomain}`;
  } else {
    playerDiv.innerHTML = '<p style="color:red;">Invalid Twitch URL format.</p>';
    return;
  }

  playerDiv.innerHTML = `
    <iframe
      src="${embedUrl}"
      frameborder="0"
      allowfullscreen="true"
      scrolling="no"
      width="100%"
      height="480">
    </iframe>
  `;
}

function submitClip() {
  const url = document.getElementById('twitchUrl').value;
  const start = document.getElementById('startTime').value;
  const end = document.getElementById('endTime').value;

  fetch('submit-clip.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, start, end })
  })
  .then(res => res.text())
  .then(data => alert('Clip submitted: ' + data))
  .catch(err => alert('Error: ' + err));
}
