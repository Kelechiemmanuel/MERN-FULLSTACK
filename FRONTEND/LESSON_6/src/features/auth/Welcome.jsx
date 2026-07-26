import { Link } from "react-router-dom"

const Welcome = () => {
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-NG', {dateStyle: 'full', timeStyle: 'long'}).format(date)

    const content = (
        <section>
            <p>{today}</p>
            <h1>Welcome!</h1>
            <p><Link to="/dash/notes">View techNote</Link></p>
            <p><Link to="/dash/users">View User setting</Link></p>
        </section>
    )

  return content
}

export default Welcome