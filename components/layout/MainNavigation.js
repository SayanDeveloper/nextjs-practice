import classes from './MainNavigation.module.css';
import Link from 'next/link';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Next Forum</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>All Posts</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Add New Post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
