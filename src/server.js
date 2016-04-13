import Server from 'socket.io';

export default function startServe () {
  return new Server().attach(8090);
}
