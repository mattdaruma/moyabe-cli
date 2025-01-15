# MoYaBe CLI

### But why?

Just a beginning of a set of development tools to be used building MoYaBe products.  Ya bought Mo some AI subscriptions for Christmas, so he's been playing with them more.  Mo is making this set of tools so that he'll be able to spit apps out around different
prompt ideas more easily.

### What It Does

So far, it just generates a MoYaBe Angular app, which is currently one with Clarity Angular installed with dark theme, the starting icons switched around, and MoYaBe branding.  

### How to Do It

#### Installation

You can register this program with your CLI by installing it globally with npm.  You can see the reference that drives this in (package.json:11)[https://github.com/mattdaruma/moyabe-cli/blob/main/package.json#L11].  

#### API

There are currently only 2 commands, help and generate.

##### help

Get a help message explaining these commands.

##### generate

This currently has a single subcommand: app.  The argument entered after the app will be treated as an app name.  Try to keep it to letters and dashes.  If no name is given, it will use 'moyabe-app-template'.  

There's also a dead 'start' command because I was using it as a sandbox and forgot to remove it.

### Where It's Going

The strategy here is to just build what I'm actually going to use to get to the point of playing with the AI the way I'd like.  The next step is to develop the base template to provide a clean UX with simple input/output pipes for the data.  
- a command to generate a new base route with a component and a resolver
    - the resolver prepped to make an http call and attach the response to a key on the route data
    - a component prepped with code to extract the resolved from the route
    - clarity module and relevant router modules in the imports
- a command to generate an intermediate route with a component and a resolver
    - starts with base route setup
    - adds loadChildren method to route providing an empty array
    - adds routeroutlet to imports and puts it in the component
    - gives it a service which the resolver ties into
        - the variable name for resolved data on the route and shared data in the service should be the same
        - the data service should emit as a readonly observable followed by $ 
            - prevent manipulation downstream
            - add async flexibility for easy manipulation
- a command to generate the base app with the app component (mostly already done, but improvements
    - full header with nav dropdown
    - no resolver.  should immediately begin displaying loading screen if data isn't ready
    - a service to make the async calls and pass core data down
    - loading panel
        - trigger by navigation events and app service init call
        - a 300ms fading animation that cancels itself gracefully if the resolver finishes sooner than that
- a command to generate an HttpInterceptor and auth service (api key is auth)
    - interceptor pipes service values into requests
    - service allows you to set the key's placement
        - as a header by header name
        - as a GET parameter by parameter name
        - a mask option for things like 'Bearer '
        - a boolean flag specifically for bearer
    - by default it triggers the interceptor to make no change and move along quickly
- a command to generate all of the above as a demo template
    - an app with 3 child apps and 3 parents of 3 child apps with a faux auth system that responds "my user"
    - displays user info on the demo in the header dropdown and adds a logged in badge to the dropdown icon
- final short term goal: develop gemini app from base demo
    - api key input in header passed into HttpInterceptor
    - each of the direct app children can be simple forms that call core functions
    - the parents can be more advanced concepts that involve generating data relationships
        - the parent can hold the relationships between child data and make complex prompts together
    - make new commands for whatever additions are made throughout the process for reusability
- may develop a prompt api for the CLI