import pygame
import sys
import random
import asyncio

# Initialize Pygame
pygame.init()

# Constants
WIDTH, HEIGHT = 600, 400
GRID_SIZE = 20
SNAKE_SIZE = 20
FPS = 10

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)

# Direction
UP = (0, -1)
DOWN = (0, 1)
LEFT = (-1, 0)
RIGHT = (1, 0)

class SnakeGame:

    # Initializes the game, sets up the screen, clock, snake, direction, apple, and other game-related variables.
    def __init__(self):
        self.screen = pygame.display.set_mode((WIDTH, HEIGHT))
        pygame.display.set_caption("Snake Game")
        self.clock = pygame.time.Clock()

        self.snake = [(100, 100), (90, 100), (80, 100)]
        self.direction = RIGHT

        self.apple = self.spawn_apple()

        self.paused = False
        self.apple_counter = 0

    # Generates a new random position for the apple, ensuring it does not overlap with the snake.
    def spawn_apple(self):
        while True:
            apple = (random.randint(0, WIDTH // GRID_SIZE - 1) * GRID_SIZE,
                     random.randint(0, HEIGHT // GRID_SIZE - 1) * GRID_SIZE)
            if apple not in self.snake:
                return apple

    # Draws the snake on the screen using Pygame's draw.rect function.
    def draw_snake(self):
        for segment in self.snake:
            pygame.draw.rect(self.screen, WHITE, (*segment, SNAKE_SIZE, SNAKE_SIZE))

    # Draws the apple on the screen using Pygame's draw.rect function.
    def draw_apple(self):
        pygame.draw.rect(self.screen, RED, (*self.apple, SNAKE_SIZE, SNAKE_SIZE))

    # Draws the apple counter on the screen using Pygame's font rendering.
    def draw_counter(self):
        font = pygame.font.Font(None, 36)
        counter_text = font.render(f"Apples: {self.apple_counter}", True, WHITE)
        self.screen.blit(counter_text, (10, HEIGHT - 40))

    # Draws the pause/play text at the bottom right corner based on the game's current state.
    def draw_pause_text(self):
        font = pygame.font.Font(None, 24)
        pause_text = font.render("Press Space to Pause" if not self.paused else "Press Space to Play", True, WHITE)
        pause_rect = pause_text.get_rect(bottomright=(WIDTH - 10, HEIGHT - 10))
        self.screen.blit(pause_text, pause_rect.topleft)

    # Checks if the snake collides with the screen boundaries or itself, triggering a game over if true.
    async def check_collision(self):
        head = self.snake[0]
        if (
            head[0] < 0
            or head[0] >= WIDTH
            or head[1] < 0
            or head[1] >= HEIGHT
            or head in self.snake[1:]
        ):
            await self.game_over()

    # Checks if the snake's head collides with the apple, increments the apple counter, and spawns a new apple.
    def check_apple_collision(self):
        head = self.snake[0]
        if head == self.apple:
            self.apple_counter += 1
            self.snake.append((0, 0))  # Dummy tail segment, will be updated in move_snake()
            self.apple = self.spawn_apple()

    # Moves the snake based on the current direction, handles collision with apples and screen boundaries.
    async def move_snake(self):
        if not self.paused:
            head = self.snake[0]
            new_head = (head[0] + self.direction[0] * GRID_SIZE, head[1] + self.direction[1] * GRID_SIZE)
            self.snake.insert(0, new_head)

            if new_head == self.apple:
                self.check_apple_collision()
            else:
                self.snake.pop()

            await self.check_collision()  

    # Draws the game over message and restart/quit options on the screen.
    def draw_game_over(self):
        font = pygame.font.Font(None, 72)
        game_over_text = font.render("Game Over", True, WHITE)
        game_over_rect = game_over_text.get_rect(center=(WIDTH // 2, HEIGHT // 2 - 40))
        self.screen.blit(game_over_text, game_over_rect.topleft)

        font = pygame.font.Font(None, 36)
        restart_text = font.render("Press 'R' to restart", True, WHITE)
        restart_rect = restart_text.get_rect(center=(WIDTH // 2, HEIGHT // 2 + 40))
        self.screen.blit(restart_text, restart_rect.topleft)

    # Displays the game over screen and handles user input for restarting or quitting the game.
    async def game_over_screen(self):
        while True:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_r:
                        self.__init__()
                        await self.run()
            self.screen.fill(BLACK)

            self.draw_game_over()
            pygame.display.flip()
            await asyncio.sleep(0)

    # Calls the game_over_screen method to handle the game over state.
    async def game_over(self):
        await self.game_over_screen()

    # Main game loop that handles user input, updates the screen, and controls the flow of the game.
    async def run(self):
        while True:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_UP and self.direction != DOWN:
                        self.direction = UP
                    elif event.key == pygame.K_DOWN and self.direction != UP:
                        self.direction = DOWN
                    elif event.key == pygame.K_LEFT and self.direction != RIGHT:
                        self.direction = LEFT
                    elif event.key == pygame.K_RIGHT and self.direction != LEFT:
                        self.direction = RIGHT
                    elif event.key == pygame.K_SPACE:
                        self.paused = not self.paused

            self.screen.fill(BLACK)

            self.draw_snake()
            self.draw_apple()
            self.draw_counter()
            self.draw_pause_text()

            await self.move_snake()

            pygame.display.flip()
            self.clock.tick(FPS)
            await asyncio.sleep(0)

if __name__ == "__main__":
    game = SnakeGame()
    asyncio.run(game.run())
