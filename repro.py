from typing import cast
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
        self.body = pymunk.Body(mass=1, moment=100)
        self.shape = pymunk.shapes.Poly(self.body, ((0, 0), (50, 0), (50, 50), (0, 50)))
        self.space.add(self.body, self.shape)

    def on_update(self, delta_time):
        self.body.apply_force_at_world_point((10, 10), self.body.position + (1, 0))
        self.space.step(delta_time)

    def on_draw(self):
        self.clear(arcade.color.AMAZON)

        # Below are two methods for drawing pymunk shape outlines:
        # pymunk's debug drawing, and a manual thing I added.
        # 
        # The former does not work, the latter does.
        # But trying to do both causes some sort of OpenGL error.

        # pymunk way: fails; no errors but I do not see anything
        opts = pymunk.pyglet_util.DrawOptions()
        self.space.debug_draw(opts)

        # manual thing: draw using arcade draw calls
        # for _shape in self.space.shapes:
        #     shape = cast(pymunk.Poly, _shape)
        #     points = [
        #         (v.rotated(shape.body.angle) + shape.body.position)
        #         for v in shape.get_vertices()
        #     ]
        #     arcade.draw_polygon_outline(color=arcade.color.BLACK, point_list=points)
    
game = MyGame()
arcade.run()