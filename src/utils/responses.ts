export default {
    help: {
        categories_embed: "Here are my command categories. To view the commands available in each category, do `?help <category name>`",
        categories: [
            "- utility",
            "- moderation"
        ]
    },
    moderation: {
        no_user_permission: "You do not have permission to execute this command!",
        no_bot_permission: "I do not have permission to execute this command!",
        no_user_provided: "Please provide a user to ",
        no_case_arg: "Please provide a case number!",
        warn: {
            could_not_warn_user: "Could not warn user! Please remove all permissions from the user in order to warn them!",
            cannot_warn_self: "You cannot warn yourself!",
        },
        kick: {
            could_not_kick_user: "Could not kick user! Please remove all permissions from the user in order to kick them!",
            cannot_kick_self: "You cannot kick yourself!",
        },
        ban: {
            could_not_ban_user: "Could not ban user! Please remove all permissions from the user in order to kick them!",
            cannot_ban_self: "You cannot ban yourself!",
        },
        unban: {
            cannot_unban_self: "You cannot unban yourself! If you were banned, you won't be able to use this command! 😉",
            user_not_banned: "That user is not banned! Ban them first in order to unban them 😉"
        }
    }
}