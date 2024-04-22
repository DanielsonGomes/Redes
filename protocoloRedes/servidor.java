import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class MultiThreadedEchoServer {

    public static void main(String[] args) throws Exception {

        int port = 4444;

        ServerSocket serverSocket = new ServerSocket(port);

        System.err.println("Started server on port " + port);

        while (true) {
            // espera blocante até alguma requisição de conexão
            Socket clientSocket = serverSocket.accept();
            System.err.println("Accepted connection from client");

            // Cria e inicia uma nova thread para lidar com o cliente
            Thread thread = new Thread(new ClientHandler(clientSocket));
            thread.start();
        }
    }

    private static class ClientHandler implements Runnable {
        private Socket clientSocket;

        public ClientHandler(Socket clientSocket) {
            this.clientSocket = clientSocket;
        }

        public void run() {
            try {
                // Cria as "streams" para o socket (buffer)
                BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);

                // espera a leitura do dado (até terminar conexão)
                String s;
                while ((s = in.readLine()) != null) {
                    out.println(s); // Ecoa de volta para o cliente
                }

                // Fecha o socket do cliente
                clientSocket.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}