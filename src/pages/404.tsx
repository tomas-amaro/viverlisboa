import Link from 'next/link'
import styled from 'styled-components'
import { theme } from '@/styles/theme'
import { Container, Typography, Button } from '@/components/ui'

const ErrorSection = styled.section`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${theme.spacing[16]} 0;
  
  background: linear-gradient(
    135deg,
    ${theme.colors.primary.blue}20 0%,
    ${theme.colors.primary.teal}20 100%
  );
`

const ErrorContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const ErrorCode = styled.h1`
  font-size: ${theme.fontSizes['7xl']};
  font-weight: ${theme.fontWeights.black};
  color: ${theme.colors.primary.blue};
  margin-bottom: ${theme.spacing[4]};
  line-height: 1;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['6xl']};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes['5xl']};
  }
`

const ErrorTitle = styled(Typography)`
  margin-bottom: ${theme.spacing[6]};
`

const ErrorDescription = styled(Typography)`
  margin-bottom: ${theme.spacing[8]};
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
  justify-content: center;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
    
    > * {
      min-width: 200px;
    }
  }
`

const SuggestedLinks = styled.div`
  margin-top: ${theme.spacing[12]};
  padding-top: ${theme.spacing[8]};
  border-top: 1px solid ${theme.colors.gray[200]};
  
  h3 {
    margin-bottom: ${theme.spacing[4]};
    color: ${theme.colors.text.primary};
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: ${theme.spacing[3]};
  }
  
  li {
    margin: 0;
  }
  
  a {
    display: block;
    padding: ${theme.spacing[3]} ${theme.spacing[4]};
    border-radius: ${theme.borderRadius.md};
    background-color: ${theme.colors.background.secondary};
    color: ${theme.colors.text.primary};
    text-decoration: none;
    transition: ${theme.transitions.fast};
    font-weight: ${theme.fontWeights.medium};
    
    &:hover {
      background-color: ${theme.colors.primary.blue};
      color: ${theme.colors.text.white};
      transform: translateY(-1px);
    }
  }
`

const Custom404 = () => {
  return (
    <ErrorSection>
      <Container>
        <ErrorContent>
          <ErrorCode>404</ErrorCode>
          
          <ErrorTitle variant="h2" align="center">
            Página não encontrada
          </ErrorTitle>
          
          <ErrorDescription variant="body1" color="secondary" align="center">
            A página que procura pode ter sido movida, removida ou não existe. 
            Verifique se o endereço está correto ou utilize os links abaixo para navegar.
          </ErrorDescription>
          
          <ActionButtons>
            <Button href="/" variant="primary" size="lg">
              Voltar ao início
            </Button>
            <Button href="/propostas" variant="outline" size="lg">
              Ver propostas
            </Button>
          </ActionButtons>
          
          <SuggestedLinks>
            <Typography variant="h4" align="center">
              Páginas mais visitadas
            </Typography>
            
            <ul>
              <li>
                <Link href="/propostas">
                  Propostas
                </Link>
              </li>
              <li>
                <Link href="/eventos">
                  Eventos
                </Link>
              </li>
              <li>
                <Link href="/noticias">
                  Notícias
                </Link>
              </li>
              <li>
                <Link href="/candidatos">
                  Candidatos
                </Link>
              </li>
              <li>
                <Link href="/apoiar">
                  Como apoiar
                </Link>
              </li>
            </ul>
          </SuggestedLinks>
        </ErrorContent>
      </Container>
    </ErrorSection>
  )
}

export default Custom404
