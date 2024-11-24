import * as LocalAuthentication from 'expo-local-authentication';

export function useAuthentication() {
    const authenticate = async () => {
        try{
            const isEnrolled = await LocalAuthentication.hasHardwareAsync() && await LocalAuthentication.isEnrolledAsync();
            if(!isEnrolled){
                alert('Autenticação biometrica não está configurada corretamente');
                return;
            }

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'É necessário se autenticar para continuar',
                fallbackLabel: 'Usar senha',
            });

            if(result.success){
                return true;
            }else{
                alert('Autenticação falhou.');
            }
        }catch(error){
            console.error('Erro ao tentar se autentificar', error);
        }
    };

    return authenticate;
}