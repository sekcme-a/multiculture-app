import "styles/reset.css"
import { UserDataProvider } from "src/context/useUserData"
import AuthStateChanged from "src/hooks/auth/AuthStateChanged"
import { AuthProvider } from "src/hooks/auth/auth"
// import { setConfig } from 'react-google-translate'

//   setConfig({
//     clientEmail: "multicultural-app@multicultural-app.iam.gserviceaccount.com",
//     privateKey:`MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC1WgWu0FVcdaOy\ncgcn0HKK5UnTvflI4VUcwNxJwZBsvo7CeLE6agKHsLTlS+xH9XC9DiQa/isqaBYM\nreqi+0YghrW23WSxuC78B8yiQpmMMn6vY2hhExqzLR3+GOmOneHHvJtegzLc29Iw\nLQ9QbOaiLqODfTPC/Jj7UzI+O5sIrkzq+2v2kTDxmwRhCAnCH1aRy0E8glMTNIM7\nbqupd3DoQycebo1RyUG7yJGgNEH+Cs7wHVMGtOl/M7p+hDqur9a7nBhIWp1vLfdz\noNs6OM1EUSzJQN+QAX00bworuemN/OxCsnGmIwC9g5A1cgrhK+ZlVVXnUusLgA7U\nw2ticvVpAgMBAAECggEAFTnp793pG9cWF6kSjtWuTnULaNnzv1TGgETPk99wztWY\nAombXtWxIZ4scikqiPqgnTQ2RCWLOl2v9QB3NefYu65gvvxXUJjZAP1NtZE7hSYU\n32Twfuo8RgwKFmdmkN+IYXdBLTUIg0LEbYicogJ5FTMFxvpk0FX99u60MwYJfaCs\nQvdlGxOp4ZN5wi27YOoD79/UbSEq1far47Yee600JZxk8Zrt71SJOMPVtgnU8GcE\nU+0i3WcW5gDJYhBNjTAAFsx/EsFRtsopRADLq5XkINJ3HE47VGImxEYHwfgtb6sb\nK/sBLttTW5eEmN0ayl4aH5OG7Al7iva0UrptvkPVoQKBgQDz4JvCc/3mfP6H0HPd\n4LWQplkuGmQxBz1bc1NbvcOxPoUDXwiOEG0GdzyJSl+Ms8K+bYhwULxwlekpF75h\nRuSZ8+kyGEqmtSl7Zx8qd8ARFORutUdoppusEVdvvzSqy7rRm/8Y8iRXFTuIqwIk\n3nJRijeDQH8qF3UvFsa0X7dt0QKBgQC+XcK0O3Sp53Z0YhK2rRhp1mUKanGAUHKb\n5oJ63vSf1th+m2rrGO3hVS6LtuNVucAkot8mDqutmL8WTMKkO79Y4yVMr6cnvYjE\nXSKP0MuPogBW0/YBfc9493rSWX/u/i3RflZ2Zt5GX7TYi+P1R6t9Y2z33o5It/Y9\nVQTeCNh8GQKBgEePGmUeX9vnxU/YrIboTp5ZEUXj3I4+T5Sr7EO5FNjHPYRVuE7n\nJvaEujCWsB67CGOUBDrglcp7UmUKYIRuptk9pqlaU11DPx7EjXKKnMLmXHjXnFJq\nwLbmh790XWHYUcL7gQiy1FLxGfzqIMDsvKKMaemLXUTeiTX9+uQmSc5hAoGASf6j\n6e6aYFhqAL8GSx9pN+pwB+ZsC9Y5VkP5P81eBKs8J6o9mvhrroSvvPrvzqiO+S6d\n0mstbCLNU9uuZKwcqm5QV0iHjrjranhRMNmV5lSwEQ/+tYGznW+EvDKxubHvGVkk\nPo2ppG0bHHjzuKmNDQYSmx5U7AslmZ1scOm7TDECgYBojrb9ltvJa8u2jNh2LwXR\nraqTreVik6Qhg3yv/lkhTihcaRtPqXBM3KWrLIg88MqAbzXEv909ToY95ON5kyMP\n4FAHXK+QkMnM87khuH8VVLqslha+kPdzqgy4SSgRt0e/jIPQBvqSW8169tH+vN50\nsMzCQGdZqm7QBpcquucepg==`,
//     projectId: "multicultural-app"
    // clientEmail: process.env.NEXT_PUBLIC_GCP_CLIENT_EMAIL,
    // privateKey: process.env.NEXT_PUBLIC_GCP_PRIVATE_KEY,
    // projectId: process.env.NEXT_PUBLIC_GCP_PROJECT_ID
  // })

function MyApp({ Component, pageProps }) {

  return (
    // <UserDataProvider>
      <AuthProvider>
        <AuthStateChanged>
          <Component {...pageProps} />
        </AuthStateChanged>
      </AuthProvider>
    // </UserDataProvider>
  ) 
}

export default MyApp
