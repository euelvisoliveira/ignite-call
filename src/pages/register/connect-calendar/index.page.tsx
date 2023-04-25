import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react';
import { Header, Container } from '../styles';
import { ArrowArcRight } from 'phosphor-react';
import { ConnectBox, ConnectItem } from './styles';
import { signIn, useSession } from 'next-auth/react';

export default function Register() {

  const session = useSession() // através dessa session consigo obter o usuário que esta logado 

	// async function handleRegister(data: RegisterFormData) {
	// }

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
						<Button variant="secondary" size="sm" onClick={() => signIn('google')}>
							Conectar
							<ArrowArcRight />
						</Button>
					</ConnectItem>

					<Button type="submit">
						Proximo passo
						<ArrowArcRight />
					</Button>

				</ConnectBox>
			</Container>
		</>
	);
}
