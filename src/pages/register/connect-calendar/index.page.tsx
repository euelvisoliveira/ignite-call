import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react';
import { Header, Container } from '../styles';
import { ArrowArcRight, Check } from 'phosphor-react';
import { AuthError, ConnectBox, ConnectItem } from './styles';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Register() {

  const session = useSession() // através dessa session consigo obter o usuário que esta logado 
  const router = useRouter() 

  console.log(session)

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google');
  }

	return (
		<>
			<Container>
				<Header>
					<Heading as="strong">Conecte sua agenda!</Heading>

					<Text>
						Conecte o seu calendário para ficar automaticamente as horas
						ocupadas e os novos eventos à medida em que são agendadas
					</Text>

					<MultiStep size={4} currentStep={2} />
				</Header>

				<ConnectBox>
					<ConnectItem>
						<Text>Google Calendar</Text>
						{isSignedIn ? (
							<Button size="sm" disabled>
                Conectado
                <Check />
              </Button>
						) : (
							<Button
								variant="secondary"
								size="sm"
								onClick={handleConnectCalendar}
							>
								Conectar
								<ArrowArcRight />
							</Button>
						)}
					</ConnectItem>

					{hasAuthError && (
						<AuthError size="sm">
							Falha ao se conectar ao Google, verifique se você habilitou as
							permissões de acesso ao Google Calendar.
						</AuthError>
					)}

					<Button type="submit" disabled={!isSignedIn}>
						Proximo passo
						<ArrowArcRight />
					</Button>
				</ConnectBox>
			</Container>
		</>
	);
}
