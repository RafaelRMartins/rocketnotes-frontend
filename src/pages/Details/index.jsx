import { Container, Links, Content } from './styles.js';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Section } from '../../components/Section';
import { Tag } from '../../components/Tag';
import { ButtonText } from '../../components/ButtonText';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../../services/api.js';

export function Details(){
  const [data, setData] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  function handleBack(){
    navigate("/");
  }

  async function handleRemove(){
    const confirm = window.confirm("Realmente deseja excluir a nota?")

    if(confirm){
      await api.delete(`/notes/${params.id}`);
      navigate("/");
    }
  }

  useEffect(() => {
    async function fetchNotes(){
      const res = await api.get(`/notes/${params.id}`);
      setData(res.data);
    }

    fetchNotes();
  },[]);
  
  return(
    <Container>
      <Header />

      {
        data &&
        <main>
          <Content>
            <ButtonText title="Excluir nota" onClick={handleRemove} />

            <h1>
              {data.title}
            </h1>

            <p>
              {data.description}
            </p>

            {
              data.links &&
              <Section title="Links úteis">
                <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}>
                        <a href={link.url} target="_blank">
                          {link.url}
                        </a>
                      </li>
                    ))
                  }
                </Links>
              </Section>
            }

            {
              data.tags &&
              <Section title="Marcadores">
                {
                  data.tags.map(tag => (
                    <Tag key={String(tag.id)} title={tag.name} />
                  ))
                }
              </Section>
            }

            <Button title="Voltar" onClick={handleBack} />

          </Content>
        </main>
      }
    </Container>
    
  )
}