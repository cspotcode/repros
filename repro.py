import pyglet
import pymunk
import pymunk.pyglet_util
import arcade

class MyGame(arcade.Window):
    def __init__(self):
        print(f'pyglet version: {pyglet.__version__}')
        print(f'pymunk version: {pymunk.version}')
        print(f'arcade version: {arcade.__version__}')
        super().__init__()
        self.space = pymunk.Space()
        self.body = pymunk.Body(mass=1, moment=1)
        self.shape = pymunk.shapes.Poly(self.body, ((0, 0), (50, 0), (50, 50), (0, 50)))
        self.space.add(self.body, self.shape)

    def on_update(self, delta_time):
        self.body.apply_force_at_local_point((1, 1), (0, 0))
        self.space.step(delta_time)

    def on_draw(self):
        self.clear(arcade.color.GREEN)

        # Two ways to draw: pymunk's debug drawing, and a manual thing I added.
        # The former does not show anything, the latter works.
        # And trying to do both causes some sort of OpenGL error.

        # This fails to draw anything
        opts = pymunk.pyglet_util.DrawOptions()
        self.space.debug_draw(opts)

        # This will draw something.
        # arcade.draw_circle_filled(self.body.position[0], self.body.position[1], 10, arcade.color.WHITE)
    
game = MyGame()
arcade.run()