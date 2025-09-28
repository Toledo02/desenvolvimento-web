import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Principal() {
  const [dadosUsuario, setDadosUsuario] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // ouve mudanças no estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // busca dados no Firestore
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDadosUsuario(docSnap.data());
        } else {
          setMensagem("Não encontramos os dados do usuário no Firestore.");
        }
      } else {
        // se não estiver logado, volta para login
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (mensagem) return <p>{mensagem}</p>;

  if (!dadosUsuario) return <p>Carregando dados...</p>;

  return (
    <div className="container">
      <h2>Página Principal</h2>
      <p>
        <strong>Nome:</strong> {dadosUsuario.nome}
      </p>
      <p>
        <strong>Sobrenome:</strong> {dadosUsuario.sobrenome}
      </p>
      <p>
        <strong>Data de Nascimento:</strong> {dadosUsuario.dataNascimento}
      </p>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default Principal;
