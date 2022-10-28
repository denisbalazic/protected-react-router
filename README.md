# protected-react-router
Authentication and authorization access control layer for react-router.
Goal of this package is to add protection for routes that need authentication and authorization while keeping clear organization and structure that react-router provides, nested routes included.

# <span style="color:red">In progress</span>
That said, this is project in early stages of formation and I could use some feedback and/or help. It should be used for development purposes only for the time being.

# Installation
Install with `npm i protected-react-router`

# Usage
After installing **protected-react-router** you should import it in your router file/module
(where you are using react-router) and replace `<Routes />` with `<PrRoutes />`,
and every `<Route />` with `<PrRoute />`. No mix and match allowed.

Now you can use those two components as you would normally use their react-router counterparts, but with some additional props you can pass:

`PrRoute`  
**isPrivate** - _boolean_ marking route that can't be accessed without authentication  
**roles** - _array of strings_ that restricts route for only those users that have requested roles


`PrRoutes`  
**isAuthed** - _boolean_ - input if user is authenticated  
**userRoles** - _array of strings_ - roles that current user has  
**notAuthenticatedRoute** - _string_, redirect to if user is not authenticated; if none provided user will be redirected to '/'  
**notAuthenticatedAction** - _function_ which will be executed if unauthenticated user is trying to access private route  
**notAuthorizedRoute** - _string_, redirect to if user is not authorized; if none provided user will be redirected to '/'  
**notAuthorizedAction** - _function_ which will be executed if unauthorized user is trying to access protected route


### Example of router component:
```
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {PrRoutes as Routes, PrRoute as Route} from 'protected-react-router';


const Router = () => {
    // access your app's authentication state with custom hook
    const [authed, userRoles] = useAuth();
    
    const notAuthenticatedAction = () => {
        // do some stuff like clear state/reducer and toast a message
    }
    
    const notAuthorizedAction = () => {
        // do some stuff like clear state/reducer and toast a message
    }

    return (
        <BrowserRouter>
            <Routes
                isAuthed={authed}
                userRoles={roles} 
                notAuthenticatedRoute="/login"
                notAuthenticatedAction={notAuthenticatedAction}
                notAuthorizedRoute="/notAuthorizedPage"
                notAuthorizedAction={notAuthorizedAction}
            >
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="teams" element={<Teams />}>
                        <Route path=":teamId" element={<Team />} />
                        <Route isPrivate path=":teamId/edit" element={<EditTeam />} />
                        <Route isPrivate path="new" element={<NewTeamForm />} />
                        <Route index element={<LeagueStandings />} />
                    </Route>
                    </Route>
                    <Route isPrivate path="games" element={<Games />}>
                        <Route path=":gameId" element={<Game />} />
                        <Route roles={['admin']} path=":gameId/edit" element={<EditGame />} />
                        <Route roles={['admin']} path="new" element={<NewGameForm />} />
                        <Route index element={<LeagueStandings />} />
                    </Route>
                </Route>
                <Route element={<PageLayout />}>
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/tos" element={<Tos />} />
                </Route>
                <Route path="contact-us" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    )
}
```
I have used example from [react-router page](https://reactrouter.com/en/main/start/concepts) and expanded it a bit to prove the point that you can leave the react-router structure and just add those new props where you want to protect a route.

### Location.state
Also, when redirected due to false authentication and/or authorization, route path is added to react-router's location object in `location.state.fromRoute`
so you can access it on redirected page with:
```
const location = useLocation();
const commingFromRoute = location.state.fromRoute
```
...and use it to redirect user back after login.

# Contributions
Any contribution is welcome. Feel free to submit issues and enhancement requests.

In general, follow the "fork-and-pull" Git workflow:

<ol>
    <li>Fork the repo on GitHub</li>
    <li>Clone the project to your own machine</li>
    <li>Commit changes to your own branch</li>
    <li>Push your work back up to your fork</li>
    <li>Submit a Pull request so that we can review your changes</li>
</ol>

