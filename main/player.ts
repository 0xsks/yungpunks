import { RpgPlayer, type RpgPlayerHooks, Control, Components } from '@rpgjs/server'

const player: RpgPlayerHooks = {
    onConnected(player: RpgPlayer) {
        player.name = 'YungPunk'
        player.setComponentsTop(Components.text('{name}'))
    },
    onInput(player: RpgPlayer, { input }) {
        if (input == Control.Back) {
            player.callMainMenu()
        }
    },
    async onJoinMap(player: RpgPlayer) {
        if (player.getVariable('AFTER_INTRO')) {
            return
        }
        await player.showText('Welcome to YungPunks: A new social identity ecosystem.')
        await player.showText('On-chain identities, available to all, that can own and trade assets, earn XP, Achievements and Rewards, share in the decision making with the community, and build applications to benefit the whole YungPunk ecosystem.')
        await player.showText('With digital sovereignty, open-source technology and decentralization at their core, YungPunks are a new identity ecosystem, closer to a protocol than a pfp.')
        await player.showText('Are you ready, Punk?')
        player.setVariable('AFTER_INTRO', true)
    }
}

export default player