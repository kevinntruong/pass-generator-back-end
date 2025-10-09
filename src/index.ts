import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { stream } from 'hono/streaming';
import fs from 'node:fs';
import { PKPass } from 'passkit-generator';

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/test/pass', (c) => {
  try {
    /** Each, but last, can be either a string or a Buffer. See API Documentation for more */
    // const { wwdr, signerCert, signerKey, signerKeyPassphrase } = getCertificatesContentsSomehow();

    const pass = new PKPass({
      "thumbnail.png": fs.readFileSync('examplePass.pass/thumbnail.png'),
      "icon.png": fs.readFileSync('examplePass.pass/icon.png'),
      "pass.json": fs.readFileSync('examplePass.pass/pass.json'),
      // "it.lproj/pass.strings": fs.readFileSync('examplePass.pass/it.lproj/pass.strings'),
    },
    {
      wwdr: fs.readFileSync('ssl-cert-snakeoil.pem').toString(),
      signerCert: fs.readFileSync('ssl-cert-snakeoil.pem').toString(),
      signerKey: fs.readFileSync('ssl-cert-snakeoil.key').toString(),
      signerKeyPassphrase: 'ssl-cert-snakeoil',
    },
    {
      // keys to be added or overridden
      serialNumber: "AAGH44625236dddaffbda",
    });

    // Adding some settings to be written inside pass.json
    // pass.localize("en", { ... });
    pass.setBarcodes("36478105430"); // Random value

    // Generate the stream .pkpass file stream
    // const passStream = pass.getAsStream();
   
    const buffer = pass.getAsBuffer();
    
    c.header('Content-type', pass.mimeType)
    c.header('Content-disposition', `attachment; filename=examplePass.pkpass`)

    return stream(c, async(stream) => {
      await stream.write(buffer)
    })
  } catch (err) {
    console.error(err);
  }

  return c.json({});
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
