---
title: "Swipe to Move in Unity: Making a Desktop Game Mobile Friendly"
date: 2024-08-05 17:35:00
categories:
  - game development
tags:
  - unity
  - game development
---

I recently learned how to move a player via touch screen swipes in Unity, and thought I'd share how and why I've done it!

While hosting the yearly [Jammin game jam](https://itch.io/jam/jammin-2024), and as part of my pre-game jam routine, I like to do some sort of warm up in the engine of choice. I've generally been into Unity more than Godot, mostly because of my day job which uses it, so I decided to warm up by looking at some older Unity projects of mine.

Reduction is a tech demo I created before entering the [GameDev.tv 2022 Game Jam](https://itch.io/jam/gamedevtv-jam-2022), I just wanted to see how easy it was to get [MagicaVoxel](https://ephtracy.github.io/) models inside Unity. It's something that could be played in 10 seconds:

<InstagramEmbed id="CiZ0aKUtenA" title="Reduction" orientation="landscape" />

I always felt it had the potential to be a casual mobile game. So, why not make it one? This is how I converted this 10 second, desktop-only tech demo into a 10 second, mobile friendly one (it's not a priority project).

## Resolution

The game was originally had a 1920x1080 resolution by default. The most popular mobile games on the play store are in portrait mode (don't take my word for it, look at the most popular games yourself: https://www.similarweb.com/top-apps/google/games/), and as a player, unless it's an action/adventure game, I prefer playing mobiles games in portrait mode.

So we first change the reference resolutions in the Player settings:

![Image showing the change to the player settings resolution for Web builds](/images/posts/reduction-player-settings.jpeg)

And we had to change the reference resolution for a canvas we had on the screen, and the scaling mode so we scale by height instead:

![Image showing the change to the canvas reference resolution](/images/posts/reduction-canvas-properties.jpg)

## Input

Unity's makes it dead easy to support mobile touch buttons and joysticks to play your games on the go. They also do a good job of making swipe support easy to add. As it's a puzzler where the player only has to move around, swiping provides a better experience that moving a touch screen joystick or d-pad.

We add a new input action for touch presses:

![Image showing new input actions and bindings for touch screen presses and swipes](/images/posts/new-input-actions-for-swipe.gif)

We use both the touch and swipe actions to determine where the player moves while swiping. How?

First we'll listen to those input events

```csharp
void OnEnable()
{
    input.Enable();
    input.Player.Keys.performed += OnMovementPerformed;
    input.Player.Keys.canceled += OnMovementCancelled;
    // New event subscriptions
    input.Player.Swipe.performed += OnSwipeDeltaPerformed;
    input.Player.Touch.canceled += OnTouchCancelled;
}

void OnDisable()
{
    input.Disable();
    input.Player.Keys.performed -= OnMovementPerformed;
    input.Player.Keys.canceled -= OnMovementCancelled;
    // Remove when the Monobehaviour is disabled
    input.Player.Swipe.performed -= OnSwipeDeltaPerformed;
    input.Player.Touch.canceled -= OnTouchCancelled;
}
```

And then we process the swipe input. We start by getting the delta of the touch movement:

```csharp
// First get the delta of the swipe
private void OnSwipeDeltaPerformed(InputAction.CallbackContext context)
{
    swipeDirection = context.ReadValue<Vector2>();
}
```

And then we get the magnitude of the movement, checking if it was an intentional swipe we should act upon. If it is intentional, move the player depending on the strongest direction of the swipe.

```csharp
private void OnTouchCancelled(InputAction.CallbackContext context)
{
    // Ignore if swipe isn't strong enough
    if (Mathf.Abs(swipeDirection.magnitude) < minimumSwipeMagnitude) return;

    if (moving || gameOver) return; // No new inputs while moving

    if (Mathf.Abs(swipeDirection.y) > Mathf.Abs(swipeDirection.x))
    {
        moveVector = new Vector2(0, swipeDirection.y > 0 ? 1 : -1);
    }
    else
    {
        moveVector = new Vector2(swipeDirection.x > 0 ? 1 : -1, 0);
    }

    // Shared function between this movement and keyboard movement logic
    DetermineTargetPosition(moveVector);
}
```

Note that there are a few variables and functions not defined in the code. If you're copying for your own game:

- `minimumSwipeMagnitude` is a float, experiment with how sensitive you need your movement to be
- `swipeDirection` is a private, Vector2 variable
- `DetermineTargetPosition` is a function that works for swipe and keyboard input

And that's the bulk of the work!

## Conclusion

In theory, taking a simple PC game and adding mobile support is straightforward. Of course, this particular game lends itself to mobile. If your game can support portrait mode, you're already one step ahead. The new input system can facilitate all sorts of input options - include touch input which isn't as discrete as a gamepad.

You'll still likely have to tweak UI elements to adapt to mobile, but here's how it looks like a mobile game:

![Image showing Reduction's main menu screen](/images/posts/reduction-mobile-title.jpg)

![Image showing gameplay of Reduction in portrait mode for mobile devices](/images/posts/reduction-mobile-game.jpg)

Happy game deving everyone!
