use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Favorites {
    pub number: u64,
    #[max_len(50)]
    pub color: String,
    #[max_len(5, 50)]
    pub hobbies: Vec<String>
}

pub const ANCHOR_DISCRIMINATOR_SIZE: usize = 8;

#[derive(Accounts)]
pub struct SetFavorites<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    
    #[account(
        init,
        payer = user,
        space = ANCHOR_DISCRIMINATOR_SIZE + Favorites::INIT_SPACE,
        seeds=[b"favorites", user.key().as_ref()],
    bump)]
    pub favorites: Account<'info, Favorites>,
    pub system_program: Program<'info, System>,
}

declare_id!("5Ax2RjTSZp5rSnfDSyojXnBKfeUEGZ5WKhEV8bvZAjjJ");

#[program]
pub mod course_7 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn set_favorites(context: Context<SetFavorites>, number: u64, color: String, hobbies:Vec<String>) -> Result<()> {
         let user_public_key = context.accounts.user.key();
         msg!("Greetings from {}", context.program_id);
         msg!(
            "User {user_public_key}'s favorite number is {number}, favorite color is: {color}",
         );
         msg!(
            "User's hobbies are: {:?}",hobbies
         );
         context.accounts.favorites.set_inner(Favorites {
            number,
            color,
            hobbies
         });
         Ok(())
    }
}


#[derive(Accounts)]
pub struct Initialize {}
