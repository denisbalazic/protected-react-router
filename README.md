# protected-react-router
Authentication and authorization access control layer for react-router.
Goal of this package is to add protection for routes that need authentication and authorization while keeping clear organization and structure that react-router provides, nested routes included.


# Installation
Install with `npm i protected-react-router`

# Usage
You should be familiar with [react-router](https://reactrouter.com/en/main/start/concepts) concepts.

After installing **protected-react-router** you should import it in your router component and replace `<Routes />` with `<PrRoutes />`,
and every `<Route />` with `<PrRoute />`. No mix and match allowed.

Now you can use those two components as you would normally use their react-router counterparts, but with some additional props you can pass:

### PrRoute  
`isPrivate` - _boolean_ - marking route that can't be accessed without authentication  
`roles` - _array of strings_ - restricts route for only those users that have requested role


### PrRoutes  
`isAuthenticated` - _boolean_ - input if user is authenticated  
`userRoles` - _array of strings_ - roles that current user has  
`notAuthenticatedRoute` - _string_ - redirect to if user is not authenticated; if none provided user will be redirected to '/'  
`notAuthenticatedAction` - _function_ - which will be executed if unauthenticated user is trying to access private route  
`notAuthorizedRoute` - _string_ - redirect to if user is not authorized; if none provided user will be redirected to '/'  
`notAuthorizedAction` - _function_ - which will be executed if unauthorized user is trying to access protected route


## Examples of router component:

#### 1. Simple router without roles
If you need to differentiate only between authenticated and unauthenticated user then `PrRoutes` should accept `isAuhenticated`
prop telling your router if user is authenticated, and `notAuthenticatedRoute` providing router with url path where should user be 
redirected to if he tries to access `PrRoute` marked with `isPrivate`. Optionally you can provide `PrRoutes` with `notAuthenticatedAction` prop 
if you need to trigger some action when user tries to access private route.
```jsx
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {PrRoutes as Routes, PrRoute as Route} from 'protected-react-router';


const Router = () => {
    // access your app's authentication state with custom hook
    const {authenticated} = useAuth();
    
    const notAuthenticatedAction = () => {
        // do some stuff like clear state/reducer and toast a message
    }

    return (
        <BrowserRouter>
            <Routes 
                authenticated={authenticated} 
                notAuthenticatedRoute="/login"
                notAuthenticatedAction={notAuthenticatedAction}
            >
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="dogs" element={<Dogs />}>
                        <Route index element={<DogIndex />} />
                        <Route path=":dogId" element={<Dog />} />
                        <Route isPrivate path=":dogId/edit" element={<EditDogForm />} />
                        <Route isPrivate path="new" element={<NewDogForm />} />
                    </Route>
                    <Route isPrivate path="cats" element={<Cats />}>
                        <Route index element={<CatIndex />} />
                        <Route path=":catId" element={<Cat />} />
                        <Route path=":catId/edit" element={<EditCatForm />} />
                        <Route path="new" element={<NewCatForm />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
```

#### 2. Router with roles
If your app requires different roles then `PrRoutes` should accept `userRoles` prop telling your router what kind of roles user has (in most cases it will be just one).
As in first case `notAuthenticatedRoute` and `notAuthenticatedAction` will provide router with information where to redirect and what action to trigger if user doesn't have any roles (and therefore is assumed not authenticated). 
Also, you should provide `notAuthorizedRoute` and `notAuthorizedAction` for users that are authenticated but don't have required role. And `PrRoute` that needs protection should accept `roles` prop, array of roles that can access it.
```jsx
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {PrRoutes as Routes, PrRoute as Route} from 'protected-react-router';


const Router = () => {
    // access your app's authentication state with custom hook
    const {roles} = useAuth();
    
    const notAuthenticatedAction = () => {
        // do some stuff like clear state/reducer and toast a message
    }
    
    const notAuthorizedAction = () => {
        // do some stuff like clear state/reducer and toast a message
    }

    return (
        <BrowserRouter>
            <Routes
                userRoles={roles}
                notAuthenticatedRoute="/login"
                notAuthenticatedAction={notAuthenticatedAction}
                notAuthorizedRoute="/notAuthorized"
                notAuthorizedAction={notAuthorizedAction}
            >
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="dogs" element={<Dogs />}>
                        <Route index element={<DogIndex />} />
                        <Route path=":dogId" element={<Dog />} />
                        <Route roles={['user', 'admin', 'superadmin']} path=":dogId/edit" element={<EditDogForm />} />
                        <Route roles={['user', 'admin', 'superadmin']} path="new" element={<NewDogForm />} />
                    </Route>
                    <Route roles={['user','admin', 'superadmin']} path="cats" element={<Cats />}>
                        <Route index element={<CatIndex />} />
                        <Route path=":catId" element={<Cat />} />
                        <Route roles={['admin', 'superadmin']} path=":catId/edit" element={<EditCatForm />} />
                        <Route roles={['superadmin']} path="new" element={<NewCatForm />} />
                    </Route>
                    <Route roles={['superadmin']} path="dragon" element={<Dragon />} />
                    <Route path="login" element={<Login />} />
                    <Route path="notAuthorized" element={<NotAuthorized />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
```

#### 3. Router with roles, mixing with `isPrivate` prop
Downside of above approach is that you have to list every role that can access certain route.
So you end up with something like this: `roles={['user', 'admin', 'superadmin']}`.
This can be avoided by marking routes that can be accessed by any role with `isPrivate`, like in first example. 
In that manner user without any role is assumed to be unauthenticated.
```jsx
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {PrRoutes as Routes, PrRoute as Route} from 'protected-react-router';


const Router = () => {
    // access your app's authentication state with custom hook
    const {roles} = useAuth();
    
    const notAuthenticatedAction = () => {
        // do some stuff like clear state/reducer and toast a message
    }
    
    const notAuthorizedAction = () => {
        // do some stuff like clear state/reducer and toast a message
    }

    return (
        <BrowserRouter>
            <Routes 
                userRoles={roles}
                notAuthenticatedRoute="/login"
                notAuthenticatedAction={notAuthenticatedAction}
                notAuthorizedRoute="/notAuthorized"
                notAuthorizedAction={notAuthorizedAction}
            >
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="dogs" element={<Dogs />}>
                        <Route index element={<DogIndex />} />
                        <Route path=":dogId" element={<Dog />} />
                        <Route isPrivate path=":dogId/edit" element={<EditDogForm />} />
                        <Route isPrivate path="new" element={<NewDogForm />} />
                    </Route>
                    <Route isPrivate path="cats" element={<Cats />}>
                        <Route index element={<CatIndex />} />
                        <Route path=":catId" element={<Cat />} />
                        <Route roles={['admin', 'superadmin']} path=":catId/edit" element={<EditCatForm />} />
                        <Route roles={['superadmin']} path="new" element={<NewCatForm />} />
                    </Route>
                    <Route roles={['superadmin']} path="dragon" element={<Dragon />} />
                    <Route path="login" element={<Login />} />
                    <Route path="notAuthorized" element={<NotAuthorized />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
```

#### 4. Router with roles hierarchy
If user roles have route permissions that are supersets of one another 
(meaning _admin_ can access everything that _user_ can and then some more, and _superadmin_ can access everything _admin_ can and then some more) 
then you can provide `PrRoutes` with prop called `rolesHierarchy` that accepts array of every role available ordered from the role with the least authority to the role with most authority. 
Then second example becomes simpler: 
```jsx
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {PrRoutes as Routes, PrRoute as Route} from 'protected-react-router';


const Router = () => {
    // access your app's authentication state with custom hook
    const {roles} = useAuth();
    
    const notAuthenticatedAction = () => {
        // do some stuff like clear state/reducer and toast a message
    }
    
    const notAuthorizedAction = () => {
        // do some stuff like clear state/reducer and toast a message
    }

    return (
        <BrowserRouter>
            <Routes 
                userRoles={roles}
                rolesHierarchy={['user', 'admin', 'superadmin']}
                notAuthenticatedRoute="/login"
                notAuthenticatedAction={notAuthenticatedAction}
                notAuthorizedRoute="/notAuthorized"
                notAuthorizedAction={notAuthorizedAction}
            >
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="dogs" element={<Dogs />}>
                        <Route index element={<DogIndex />} />
                        <Route path=":dogId" element={<Dog />} />
                        <Route roles={['user']} path=":dogId/edit" element={<EditDogForm />} />
                        <Route roles={['user']} path="new" element={<NewDogForm />} />
                    </Route>
                    <Route roles={['user']} path="cats" element={<Cats />}>
                        <Route index element={<CatIndex />} />
                        <Route path=":catId" element={<Cat />} />
                        <Route roles={['admin']} path=":catId/edit" element={<EditCatForm />} />
                        <Route roles={['superadmin']} path="new" element={<NewCatForm />} />
                    </Route>
                    <Route roles={['superadmin']} path="dragon" element={<Dragon />} />
                    <Route path="login" element={<Login />} />
                    <Route path="notAuthorized" element={<NotAuthorized />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
```
Here `roles={[admin]}` means that this route is accessible to both _admin_ and _superadmin_ roles, but not _user_ role. 
When using `userHierarchy` prop `roles` should accept only one role.



### ProtectedWrapper
If you want to hide piece of your UI based on authentication and/or authorization you can do so by wrapping it in 
`ProtectedWrapper` component and using same rules as described above with `isPrivate` and `roles` props:
```jsx
<ProtectedWrapper isPrivate>
    <p>this text is for authenticated user only</p>
</ProtectedWrapper>
<ProtectedWrapper roles={['admin']}>
    <p>this text is for admin</p>
</ProtectedWrapper>
```


### Last location
Also, there is little helper included that provides you with previous location: `useLastLocation`. 
It is whole react-router's Location object from previous route.
```jsx
import {useLastLocation} from 'protected-react-router'

const location = useLastLocation();
const commingFromRoute = location.pathname
```
Alternatively, when redirected due to false authentication and/or authorization, route path is added to react-router's location object in `location.state.redirectedFromRoute`
so you can access it on redirected page with:
```jsx
const location = useLocation();
const commingFromRoute = location.state.redirectedFromRoute
```
You can use both approaches to redirect user back after login.

# Test it

I am working on small demo app, and you can find it here: https://github.com/denisbalazic/protected-react-router-test-app.
It is far from finished (almost no styles), but it shows basic principles described above.

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

