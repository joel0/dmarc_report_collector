const PostalMime = require('postal-mime');

export default {
  async email(message, env, ctx) {
    if (env.FALLTHROUGH_ADDR === "") {
      throw new Error('FALLTHROUGH_ADDR env variable is required');
    }

    const parser = new PostalMime.default();

    const rawEmail = await streamToArrayBuffer(message.raw, message.rawSize);
    const parsedEmail = await parser.parse(rawEmail);
    
    console.log('Mail subject: ', parsedEmail.subject);
    console.log('HTML body: ', parsedEmail.html);
    console.log('Text body: ', parsedEmail.text);
    if (parsedEmail.attachments.length == 0) {
      console.log('No attachments');
    } else {
      parsedEmail.attachments.forEach(att => {
        console.log('Attachment: ', att.filename);
        console.log('Attachment disposition: ', att.disposition);
        console.log('Attachment MIME type: ', att.mimeType);
        console.log('Attachment size: ', att.content.byteLength);
      });
    }

    await message.forward(env.FALLTHROUGH_ADDR);
  },
};

async function streamToArrayBuffer(stream, streamSize) {
  let result = new Uint8Array(streamSize);
  let bytesRead = 0;
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result.set(value, bytesRead);
    bytesRead += value.length;
  }
  return result;
}
