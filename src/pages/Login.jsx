import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      // login deu certo → vai para principal
      navigate("/principal");
    } catch (error) {
      console.error(error);
      setMensagem("Usuário não está cadastrado ou senha incorreta.");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <br />

      <button onClick={handleLogin}>Acessar</button>

      <p>{mensagem}</p>

      <p>
        Ainda não tem conta? <Link to="/cadastro">Cadastre-se aqui</Link>
      </p>
    </div>
  );
}

export default Login;
