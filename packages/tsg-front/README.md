### Serving local dev assets via HTTPS

First generate your certs.

```
mkdir certs && openssl req -x509 -out certs/localhost.crt -keyout certs/localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

## Debugging inside VS Code

Debugging in the IDE is always a great feature. With the [VS Code Chrome Debug Plugin](https://github.com/Microsoft/vscode-chrome-debug) you can launch code with the remote debugging port open then VS Code can connect to the tab where you're running AdForge front tend. In the `.vscode` folder `launch.json` specifies the configuration for this. You must first run chrome like this below:

### Windows

Right click the Chrome shortcut, and select properties
In the "target" field, append --remote-debugging-port=9222
Or in a command prompt, execute <path to chrome>/chrome.exe --remote-debugging-port=9222

### macOS

In a terminal, execute `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222`

### Linux

In a terminal, `launch google-chrome --remote-debugging-port=9222`
If you have another instance of Chrome running and don't want to restart it, you can run the new instance under a separate user profile with the --user-data-dir option. Example: --user-data-dir=/tmp/chrome-debug. This is the same as using the userDataDir option in a launch-type config.
