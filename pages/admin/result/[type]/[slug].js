import { useRouter } from "next/router"
import styles from "styles/admin/admin.module.css"
import LoaderGif from "src/components/loader/LoaderGif";
import Navbar from "src/components/admin/Navbar"
import Header from "src/components/admin/Header"
import useAuth from "src/hooks/auth/auth";
import ResultTable from "src/components/admin/ResultTable"

const Result = () => {
  const router = useRouter()
  const { type, slug } = router.query
  const { user, userrole, setUserrole, setTeamName,teamName } = useAuth();
  

  return (
    <div className={styles.main_container}>
      <Navbar teamName={teamName} />
      <Header location="result" />
      <div className={styles.content_container}>
        <ResultTable type={type} docId={slug} />
      </div>
    </div>
  )
}

export default Result