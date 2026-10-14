import { ClerkProvider, SignIn, SignUp } from '@clerk/react';
import { publishableKeyFromHost } from '@clerk/react/internal';
import { shadcn } from '@clerk/themes';
import { useLocation, useNavigate } from 'react-router-dom';
import EducationAdmin from './EducationAdmin';
import './Education.css';
const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const appearance = {
  theme: shadcn,
  options: { logoPlacement: 'inside', logoLinkUrl: '/', logoImageUrl: `${window.location.origin}${basePath}/images/ipm-logo-new-optimized.webp` },
  variables: { colorPrimary: '#b28d36', colorForeground: '#102235', colorMutedForeground: '#536171', colorBackground: '#faf7ef', colorInput: '#ffffff', colorInputForeground: '#102235', colorDanger: '#a83232', colorNeutral: '#536171', fontFamily: 'Montserrat, sans-serif', borderRadius: '0.5rem' },
  elements: { rootBox: { width: '100%', display: 'flex', justifyContent: 'center' }, cardBox: { background: '#faf7ef', width: '440px', maxWidth: '100%' }, logoImage: { maxHeight: '70px' }, headerTitle: { color: '#102235' }, headerSubtitle: { color: '#536171' }, formFieldLabel: { color: '#102235' }, footerActionLink: { color: '#725719' }, footerActionText: { color: '#536171' }, socialButtonsBlockButtonText: { color: '#102235' }, dividerText: { color: '#536171' }, identityPreviewEditButton: { color: '#725719' }, formFieldSuccessText: { color: '#235333' }, alertText: { color: '#a83232' } },
};
export default function EducationAuth() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return <ClerkProvider publishableKey={clerkPubKey} proxyUrl={clerkProxyUrl} appearance={appearance}
    signInUrl={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`}
    routerPush={to => navigate(to)} routerReplace={to => navigate(to, { replace: true })}
    localization={{ signIn: { start: { title: 'IPM staff sign-in', subtitle: 'Only invited, verified staff can manage education content.' } }, signUp: { start: { title: 'Register your invited staff account', subtitle: 'Creating an account does not grant editorial access.' } } }}>
    {pathname.startsWith('/sign-in') ? <div className="education" style={{ padding: '64px 16px', minHeight: '65vh' }}><SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} forceRedirectUrl="/admin/education" /></div>
      : pathname.startsWith('/sign-up') ? <div className="education" style={{ padding: '64px 16px', minHeight: '65vh' }}><SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} forceRedirectUrl="/admin/education" /></div>
      : <EducationAdmin />}
  </ClerkProvider>;
}
